import { useState, useEffect } from "react";
import classes from "./details.module.css";

interface DetailsData {
  avatar: string | undefined;
  details: {
    city: string;
    company: string;
    position: string;
  };
}

interface DetailsProps {
  id: number;
}

export const Details: React.FC<DetailsProps> = (props) => {
  const { id } = props;
  const [data, setData] = useState<DetailsData>({
    avatar: "",
    details: {
      city: "",
      company: "",
      position: "",
    },
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${id.toString()}.json`
        );
        if (response.ok) {
          const result: DetailsData = await response.json();
          setData(result);
        } else {
          console.error(`Ошибка загрузки данных: ${response.status}`);
        }
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      } finally {
        setLoading(false); // Завершаем загрузку
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <div className={classes.container}>
        {loading ? ( // Проверка состояния загрузки
          <div>Загрузка...</div> // Индикатор загрузки
        ) : (
          <>
            <div className={classes.img}>
              <img src={data.avatar} alt="avatar" />
            </div>
            <div className={classes.city}>City: {data.details.city}</div>
            <div className={classes.company}>
              Company: {data.details.company}
            </div>
            <div className={classes.position}>
              position: {data.details.position}
            </div>
          </>
        )}
      </div>
    </>
  );
};
