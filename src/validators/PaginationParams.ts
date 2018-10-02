import { IsInt, Min } from 'class-validator';

export default class PaginationParams {
    @IsInt()
    @Min(1)
    public page;

    @IsInt()
    @Min(1)
    public pageSize;
}
