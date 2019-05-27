/**
 * Copyright (C) 2019, SoftWaring Solutions ATF The Miss Trust
 */

const G = 9.81;               // Gravity.

/**
 * A 1-d Hydrodyanmic model.
 *
 * This is a channel model, which implements depth-averaged momentum and continuity equations.
 * The channel is represented as an equispaced grid (dx). The surface evelation is forced at either
 * end of the channel, using the etaspec function (see config). Hydrodynamic models are time-stepping,
 * but the delta time (dt in this case) must not be less than the time it take a parcel of water moving
 * at the maximum velocity to traverse a cell dimension (dx). To select an appropriate dt, consider
 * the courant number (see https://en.wikipedia.org/wiki/Courant%E2%80%93Friedrichs%E2%80%93Lewy_condition)
 *
 * @author Jason Waring
 */
class HD1D {

    // Initialisation of the class.
    constructor(config) {
        this.reset(config);
    }

    reset(config) {
        this.fnEtaSpec = config.etaspec;
        this.fnUSpec = config.uspec;
        this.h = config.h;
        this.dt = config.dt;
        this.dx = config.dx;
        this.fCoeff = config.fCoeff;
        this.nx = config.ncells;            // Length of channel


        this.t = 0;                         // Current time.
        this.stepcount = 0;                 // Number of times step was called.
        this.nxp1 = this.nx + 1;            // Length plus one.
        this.nxm1 = this.nx - 1;            // Length minus one.
        this.x = new Array(this.nxp1);      // X grid.
        this.xcentre = new Array(this.nx);  // X grid centre.
        this.u = new Array(this.nxp1);      // Current.
        this.newu = new Array(this.nxp1);   // New current.
        this.eta = new Array(this.nxp1);    // Surface elevation.
        this.neweta = new Array(this.nxp1); // New surface elevation.
        this.flags = new Array(this.nxp1);  // Masking flags.

        // Initialise all arrays
        for (var i = 0; i < this.nxp1; ++i) {
            this.u[i] = 0.0;
            this.newu[i] = 0.0;
            this.eta[i] = 0.0;
            this.neweta[i] = 0.0;
            this.flags[i] = false;
        }

        // Setup grid
        this.x[0] = config.offset;
        for (i = 1; i < this.nxp1; ++i) {
            this.x[i] = this.x[i - 1] + this.dx;
        }

        for (i = 0; i < this.nx; ++i) {
            this.xcentre[i] = (this.x[i + 1] + this.x[i]) / 2.0;
        }

        // SHould be set externally, but this is a channel after all.
        this.flags[0] = true;
        this.flags[this.nxm1] = true;
    }

    // Step forward by one time-step.
    step() {
        // Compute u
        for (var i = 1; i < this.nx; ++i) {
            var dudt = -(G * (this.eta[i] - this.eta[i - 1]) / this.dx);
            dudt = dudt - this.u[i] * this.fCoeff;            // Linear friction.
            this.newu[i] = this.u[i] + this.dt * dudt;
        }

        this.uboundary();

        // Copy newu to u
        for (i = 0; i < this.nxp1; ++i) {
            this.u[i] = this.newu[i];
        }

        // Compute eta
        for (i = 0; i < this.nx; ++i) {
            var detadt = -(this.h * (this.u[i + 1] - this.u[i]) / this.dx);
            this.neweta[i] = this.eta[i] + this.dt * detadt;
        }

        this.etaboundary();

        // Copy neweta to eta
        for (i = 0; i < this.nx; ++i) {
            this.eta[i] = this.neweta[i];
        }

        this.uspec();
        this.etaspec();

        ++this.stepcount;
        this.t += this.dt;
    }

    // Manages the U boundary points.
    uboundary() {
        // newu[0] = 0.0;
        // newu[nx] = 0.0;
        this.newu[0] = this.newu[1];
        this.newu[this.nx] = 0.0;
//        this.newu[this.nx] = this.newu[this.nxm1];
    }


    // Manages the ETA boundary points.
    etaboundary() {
    }

    // Manages the U specification points.
    uspec() {
    }

    // Manages the ETA specification points.
    etaspec() {
        for (var i = 0; i < this.nx; ++i) {
            if (this.flags[i]) {
                let e = this.fnEtaSpec(this, this.stepcount, i);
                if (e !== undefined) {
                    this.eta[i] = e;
                }
            }
        }
    }
}

export default HD1D;
