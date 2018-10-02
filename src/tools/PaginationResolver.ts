import { get } from 'lodash';
import Pagination from '../common/Pagination';
import PaginationParams from '../validators/PaginationParams';

export default function paginationResolver(paginationParams: PaginationParams): Pagination {
    const page = get(paginationParams, 'page');
    const pageSize = get(paginationParams, 'pageSize');

    return (page && pageSize) ?
        {
            skip: (page - 1) && pageSize && (page - 1) * pageSize,
            take: pageSize,
        }
        : undefined;
}
