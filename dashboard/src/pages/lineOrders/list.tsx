import { useMany, useTable } from "@refinedev/core";

export const ListLineOrders = () => {
    // const { data, isLoading } = useList({
    //     resource: "line_orders",
    //     pagination: { current: 1, pageSize: 10 },
    //     sorters: [{ field: "order_number", order: "desc" }],
    //     filters: [{ field: "order_number", operator: "eq", value: "3336-2(24)" }],
    // });

    const {
        tableQuery: { data, isLoading },
        current,
        setCurrent,
        pageCount,
        sorters,
        setSorters,
    } = useTable({
        resource: "line_orders",
        pagination: { current: 1, pageSize: 10 },
        sorters: { initial: [{ field: "order_number", order: "asc" }] },
    });

    const { data: organizations } = useMany({
        resource: "organizations",
        ids: data?.data?.map((order) => order.organization_id) ?? [],
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const onPrevious = () => {
        if (current > 1) {
            setCurrent(current - 1);
        }
    };

    const onNext = () => {
        if (current < pageCount) {
            setCurrent(current + 1);
        }
    };

    const onPage = (page: number) => {
        setCurrent(page);
    };

    // We'll use this function to get the current sorter for a field.
    const getSorter = (field: string): string | undefined => {
        const sorter = sorters?.find((sorter) => sorter.field === field);

        return sorter ? sorter.order : undefined;
    }

    // We'll use this function to toggle the sorters when the user clicks on the table headers.
    const onSort = (field: string) => {
        const sorter = getSorter(field);
        setSorters(
            sorter === "desc" ? [] : [
                {
                    field,
                    order: sorter === "asc" ? "desc" : "asc",
                },
            ]
        );
    }

    // We'll use this object to display visual indicators for the sorters.
    const indicator = { asc: "⬆️", desc: "⬇️" };

    return (
        <div>
            <h1>Заказы</h1>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => onSort("id")}>
                            ID {indicator[getSorter("id")]}
                        </th>
                        <th onClick={() => onSort("order_number")}>
                            Заказ {indicator[getSorter("order_number")]}
                        </th>
                        <th onClick={() => onSort("organization_id")}>
                            ТОР ID {indicator[getSorter("organization_id")]}
                        </th>
                        <th onClick={() => onSort("order_create_date")}>
                            Дата заказа {indicator[getSorter("order_create_date")]}
                        </th>
                        <th onClick={() => onSort("costumer_contact_phone")}>
                            Телефон {indicator[getSorter("costumer_contact_phone")]}
                        </th>
                        <th onClick={() => onSort("is_completed")}>
                            Выполнен {indicator[getSorter("is_completed")]}
                        </th>
                        <th onClick={() => onSort("created_at")}>
                            Создан {indicator[getSorter("created_at")]}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data?.data?.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.order_number}</td>
                            <td>{
                                // order.organization_id
                                organizations?.data?.find((organization) => organization.id == order.organization_id)?.title
                            }</td>
                            <td>{order.order_create_date}</td>
                            <td>{order.costumer_contact_phone}</td>
                            <td>{order.is_completed}</td>
                            <td>{order.created_at}</td>
                        </tr>

                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button type="button" onClick={onPrevious}>
                    {"<"}
                </button>
                <div>
                    {current - 1 > 0 && (
                        <span onClick={() => onPage(current - 1)}>{current - 1}</span>
                    )}
                    <span className="current">{current}</span>
                    {current + 1 < pageCount && (
                        <span onClick={() => onPage(current + 1)}>{current + 1}</span>
                    )}
                </div>
                <button type="button" onClick={onNext}>
                    {">"}
                </button>
            </div>
        </div >
    );
};