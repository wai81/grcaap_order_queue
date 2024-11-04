import { Create, SaveButton, useSelect } from "@refinedev/antd";
import { useForm } from "@refinedev/core";
import { Form, Input, Select } from "antd";

export const CreateOrderLine = () => {
    // const { onFinish, mutation } = useForm({
    //     redirect: "edit",
    // });

    const { formProps, saveButtonProps } = useForm({
        refineCoreProps: {
            redirect: "edit",
        },
    });

    const { selectProps } = useSelect({
        resource: "organizations",
        // optionLabel: "title", // Default value is "title" so we don't need to provide it.
        // optionValue: "id", // Default value is "id" so we don't need to provide it.
    });

    // const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();

    //     // Using FormData to get the form values and convert it to an object.
    //     //const data = Object.fromEntries(new FormData(event.target).entries());
    //     const data = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
    //     // Calling onFinish to submit with the data we've collected from the form.
    //     onFinish({
    //         ...data,
    //         // organization_id: Number(data.organization),
    //         is_completed: false,
    //     });
    // };

    return (
        <Create>
            <Form {...formProps} layout="vertical">
                <Form.Item label="Номер заказа" name="order_number">
                    <Input />
                </Form.Item>
                <Form.Item label="Дата заказа" name="order_create_date">
                    <Input />
                </Form.Item>
                <Form.Item label="Телефон" name="costumer_contact_phone">
                    <Input />
                </Form.Item>
                <Form.Item label="ТОР" name={"organization_id"}>
                    <Select {...selectProps} />
                </Form.Item>
                <Form.Item label="Выполенн" name="is_completed">
                    {/* <BooleanField /> */}
                </Form.Item>
                {/* SaveButton renders a submit button to submit our form */}
                {/* <SaveButton {...saveButtonProps} /> */}
            </Form>
        </Create>
        // <form onSubmit={onSubmit}>
        //     <label htmlFor="order_number">Заказ</label>
        //     <input type="text" id="order_number" name="order_number" />

        //     <label htmlFor="costumer_contact_phone">Телефон</label>
        //     <input type="text" id="costumer_contact_phone" name="costumer_contact_phone" />

        //     <label htmlFor="order_create_date">Дата Заказа</label>
        //     <input type="datetime-local" id="order_create_date" name="order_create_date" />

        //     <label htmlFor="organization_id">ТОР ID</label>
        //     {/* <input type="number" id="organization" name="organization" /> */}
        //     <select id="organization_id" name="organization_id">
        //         {options?.map((option) => (
        //             <option key={option.value} value={Number(option.value)}>
        //                 {option.label}
        //             </option>
        //         ))}
        //     </select>

        //     {mutation.isSuccess && <span>successfully submitted!</span>}
        //     <button type="submit">Submit</button>
        // </form>
    );
};