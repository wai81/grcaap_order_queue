import * as React from "react";

//const OrderLineSearch: React.FC = observer(() => {
const OrderLineSearch: React.FC = (() => {

    return(
        <div className="p-4">
            <input
                type="text"
                placeholder="Search tickets..."
                // value={ticketStore.searchQuery}
                // onChange={handleSearchChange}
                className="border p-2 w-full mb-4"
            />
            <ul>
                {/*{ticketStore.filteredTickets.map(ticket => (*/}
                {/*    <li key={ticket.id} className="border-b p-2">*/}
                {/*        {ticket.title}*/}
                {/*    </li>*/}
                {/*))}*/}
            </ul>
        </div>
    );
});

export default OrderLineSearch