/*
 * Copyright 2019 SoftWaring Solutions Pty Ltd.
 */


/**
  * A 1-d Hydrodyanmic model configuration
 *
  * @author Jason Waring
  */

const lambdaLength = 100;

let CosineEtaSpec = (hd1d, step, i) => {
    if (step < 2 * lambdaLength) {
        return 0.5 * (1.0 + Math.cos((2.0 * Math.PI * step) / lambdaLength + Math.PI));
    } else {
        return undefined;
    }
};


let TriangleEtaSpec = (hd1d, step, i) => {
    if (step < 2 * lambdaLength) {
        /* Triangular forcing function */
        let ll2 = lambdaLength / 2.0;
        if (step >= ll2) {
            return (lambdaLength - step) / ll2;
        } else {
            return step / ll2;
        }
    } else {
        return undefined;
    }
};

let SquareEtaSpec = (hd1d, step, i) => {
    if (step < 2 * lambdaLength) {
        return 1.0;
    } else {
        return undefined;
    }
};

let PhasedWaveEtaSpec = (hd1d, step, i) => {
    if (step < 2 * lambdaLength) {
        if (i === 0) {
            /* Cosine forcing function of three 'overlaid' waves */
            return 0.5 * (1.0 + Math.cos((1.0 * Math.PI * step) / lambdaLength + Math.PI));
        } else {
            return 0.75 * (1.0 + Math.cos((2.0 * Math.PI * step) / lambdaLength + Math.PI));
        }
    } else {
        return undefined;
    }
};

let EmptyUSpec = (hd1d, step, i) => {
    return undefined;
};

class HD1DConfig {
    constructor() {
        this.ncells = 150;           // Length of channel.
        this.offset = 0.0;           // Start location of grid.
        this.dx = 100.0;             // Grid width.
        this.h = 150.0;              // Depth.
        this.dt = 1.0;               // Time step in s.
        this.fCoeff = 0.0001;        // Friction coefficient.
        this.lambdaLength = 100;
        this.etaspec = PhasedWaveEtaSpec;
        this.uspec = EmptyUSpec;
    }

    specLabels() {
        return [
            "Cosine",
            "Triangle",
            "Square",
            "Multi"
        ];
    }

    setSpecification(id) {
        switch (id) {
            case 0:
                this.etaspec = CosineEtaSpec;
                this.uspec = EmptyUSpec;
                break;

            case 1:
                this.etaspec = TriangleEtaSpec;
                this.uspec = EmptyUSpec;
                break;

            case 2:
                this.etaspec = SquareEtaSpec;
                this.uspec = EmptyUSpec;
                break;

            default:
                this.etaspec = PhasedWaveEtaSpec;
                this.uspec = EmptyUSpec;
                break;

        }
    }
}

export default HD1DConfig;
