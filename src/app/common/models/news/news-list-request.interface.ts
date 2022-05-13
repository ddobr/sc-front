export interface INewsListRequest {
    from_date?: string, 
	to_date?: string,
	limit?: number,
	newer_first?: boolean
}