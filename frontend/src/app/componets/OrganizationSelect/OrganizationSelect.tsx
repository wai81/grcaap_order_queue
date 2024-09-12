import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { organizationStore } from "../stores/organizationStore";


const OrganizationSelect: React.FC = observer(() => {
    useEffect(() => {  
        organizationStore.fetchOrganizations();  
      }, []);
      
      if (organizationStore.loading) {  
        return <div>Loading organizations...</div>;  
      }  
    
      if (organizationStore.error) {  
        return <div>Error: {organizationStore.error}</div>;  
      } 

    return (
      <select className="w-full p-2 border border-gray-300 rounded-md">
        <option value="">Выберите организацию где подавалось завление</option>
        {organizationStore.organizations.map((org) => (
          <option key={org.id} value={org.id}>
            {org.title}
          </option>
        ))}
      </select>
      // <div className="mb-4">
      //     <select
      //         value={requestStore.selectedOrganization}
      //         onChange={(e) => requestStore.setSelectedOrganization(e.target.value)}
      //         className="w-full p-2 border rounded"
      //     >
      //         <option value="">Все организации</option>
      //         {requestStore.organizations.map((organization, index) => (
      //             <option key={index} value={organization}>
      //                 {organization}
      //             </option>
      //         ))}
      //     </select>
      // </div>
    );
});

export default OrganizationSelect;