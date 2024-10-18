import { useState, useEffect } from "react"
import classes from "./list.module.css"
import { Details } from "../Details/Details";

interface ListData {
    id: number;
    name: string;
}

export const List: React.FC = () => {
    const [list, setList] = useState<ListData[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const openDetails = (id: number) => {
        setSelectedId(id);
    }
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json');
                const result: ListData[] = await response.json();
                setList(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <div className={classes["list-container"]}>
                {list.map(item => {
                    return <div key={item.id} className={classes.item} onClick={() => openDetails(item.id)}>{item.name}</div>
                })}
            </div>
            {selectedId && <Details id={selectedId} />}
        </>
    )
}