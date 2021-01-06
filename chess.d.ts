import * as chess from 'chess.js'

declare module "chess.js" {
    export interface Chess {
        constructor();
        new(): any;
        load_pgn(pgn: string | undefined): void;
        history(): any;
        reset(): any;
        move(move: any): any;
        fen(): any;

    }

}