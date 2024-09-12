import Header from "./Header";
import "./styles.css"
import OrderLineSearch from "../componets/OrderLineSearch/OrderLineSearch";
import OrganizationSelect from "../componets/OrganizationSelect/OrganizationSelect";

function App() {
    // const [organizations, setOrganizations] = useState<Organization[]>([]);
    //     const [total, setTotal] = useState<number>(0);

    // useEffect(() => {
    //     axios.get<Organization[]>('http://localhost:8001/organizations')
    //         .then(response => {
    //             console.log(response.data)
    //             setTotal(response.data.total)
    //             setOrganizations(response.data.items)
    //         })
    // }, [])

    return (
        <div className={"app"}>
            <Header title={'РУП "Гродненское агентство по государственной регистрации и земельному кадастру"'}/>
            {/* <ul>
                {organizations.map(organization => (
                    <li key={organization.id}>
                        {organization.id} {organization.fullname}
                    </li>
                ))}

            </ul> */}
            {/* <OrganizationSelect/> */}
            <OrderLineSearch/>
        </div>
    )
}

export default App
