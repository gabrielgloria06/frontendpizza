import { api } from "@/services/app";
import { Orders } from "./components/orders";
import { getCookieServer } from "@/lib/cookiServer";
import { OrderProps } from "@/lib/order.type";


async function getOrders(): Promise<OrderProps[] | []> {
    try {
        const token = await getCookieServer();
        const response = await api.get("/orders",{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        return response.data || [];

    } catch (err) {
        console.log(err)
        return [];
    }
}

export default async function Dashboard(){
   
    const orders = await getOrders();

    console.log(orders)

    return(
     <div>
        <Orders orders={orders}/>
     </div>
    )
}