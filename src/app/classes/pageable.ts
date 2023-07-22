import { Sort } from "./sort";

export class Pageable {

    constructor(
        public sort: Sort,
        public offset: number,
        public pageSize: number,
        public unpaged: boolean,
        public paged: boolean
    ) {

    }
}
