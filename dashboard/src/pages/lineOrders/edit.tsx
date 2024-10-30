import { useForm, useSelect } from "@refinedev/core";

export const EditLineOrder = () => {
    const { onFinish, mutation, query } = useForm({
        redirect: "show",
    });

    const record = query?.data?.data;

    const { options } = useSelect({
        resource: "organizations",
    });

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Using FormData to get the form values and convert it to an object.
        const data = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
        // Calling onFinish to submit with the data we've collected from the form.
        console.log(data)
        onFinish({
            ...data,
            // organization_id: Number(data.organization),
        });
    };


    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="order_number">Заказ</label>
            <input type="text" id="order_number" name="order_number" defaultValue={record?.order_number} />

            <label htmlFor="costumer_contact_phone">Телефон</label>
            <input type="text" id="costumer_contact_phone" name="costumer_contact_phone" defaultValue={record?.costumer_contact_phone} />

            <label htmlFor="order_create_date">Дата Заказа</label>
            <input type="datetime-local" id="order_create_date" name="order_create_date" defaultValue={record?.order_create_date} />

            <input type="checkbox" id="is_completed" name="is_completed" defaultValue={record?.is_completed} />
            <label htmlFor="is_completed">Выполнен</label>

            <label htmlFor="organization_id">ТОР ID</label>
            {/* <input type="number" id="organization" name="organization" /> */}
            <select id="organization_id" name="organization_id">
                {options?.map((option) => (
                    <option key={option.value} value={Number(option.value)}
                        selected={record?.organization_id == option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>

            {mutation.isSuccess && <span>successfully submitted!</span>}
            <button type="submit">Submit</button>
        </form>
    );
};