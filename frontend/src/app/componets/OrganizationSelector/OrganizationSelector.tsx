import React from "react";
import { observer } from "mobx-react-lite";
import { requestStore } from "./RequestStore";

const OrganizationSelector: React.FC = observer(() => {
    return (
        <div className="mb-4">
            <select
                value={requestStore.selectedOrganization}
                onChange={(e) => requestStore.setSelectedOrganization(e.target.value)}
                className="w-full p-2 border rounded"
            >
                <option value="">Все организации</option>
                {requestStore.organizations.map((organization, index) => (
                    <option key={index} value={organization}>
                        {organization}
                    </option>
                ))}
            </select>
        </div>
    );
});

export default OrganizationSelector;