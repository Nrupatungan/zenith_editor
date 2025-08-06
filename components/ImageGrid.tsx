"use client"

import { useState, useMemo, useEffect } from 'react';
import ObjectCard from './ObjectCard'
import useSWR from "swr"
import { Object } from '@/app/generated/prisma'
import fetcher from '@/lib/fetcher'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination'
import useModalStore from '@/store';

function ImageGrid({
    id,
    objectCount = 0,
}: {
    id: string,
    objectCount?: number
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const {setMutateObjects} = useModalStore()
    const skip = useMemo(() => (currentPage - 1) * itemsPerPage, [currentPage, itemsPerPage]);

    const { data: objects, error, isLoading, mutate } = useSWR<Object[]>(`/objects?id=${id}&take=${itemsPerPage}&skip=${skip}`, fetcher);

    // Calculate the total number of pages
    const totalPages = useMemo(() => Math.ceil(objectCount / itemsPerPage), [objectCount, itemsPerPage]);

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => Math.max(1, prevPage - 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(totalPages, prevPage + 1));
    };

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        setMutateObjects(mutate)
    }, [])

    if (isLoading) return <div className="text-center py-8">Loading objects...</div>;
    if (error) return <div className="text-center py-8 text-red-500">Failed to load objects.</div>;

    const objectsToDisplay = Array.isArray(objects) ? objects : [];

    // Generate an array of page numbers for rendering pagination links
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <>
            <div className="grid gap-8 md:gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                {objectsToDisplay.length > 0 ? (
                    objectsToDisplay.map((object: Object) => (
                        <ObjectCard
                            key={object.id}
                            id={object.id}
                            fileId={object.fileId}
                            objectUrl={object.objectUrl}
                            title={object.title}
                            alt={object.alt ?? ""}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center py-8 text-gray-500">No objects found.</div>
                )}
            </div>

            {totalPages > 1 && (
                <Pagination className="mt-8">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={handlePreviousPage}
                                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                            />
                        </PaginationItem>

                        {/* Render page numbers */}
                        {pageNumbers.map(number => (
                            <PaginationItem key={number}>
                                <PaginationLink
                                    href="#"
                                    onClick={() => handlePageClick(number)}
                                    isActive={number === currentPage}
                                >
                                    {number}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        {/* <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem> */}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={handleNextPage}
                                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </>
    )
}

export default ImageGrid