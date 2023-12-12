import { Link, useNavigate } from "react-router-dom";
import { useProfileQuery } from "../../provider/query/use-profile-query";
import { Nav } from "@nav";

export function ProfilePage() {
    const profileQuery = useProfileQuery();

    if (!profileQuery.data) return null;

    return (
        <div>
            <p>Имя = {profileQuery.data.name}</p>
            <p>Почта = {profileQuery.data.email}</p>
            <p>Отчество = {profileQuery.data.patronymic}</p>
            <p>Фамилия = {profileQuery.data.surname}</p>
            <p>Телефон = {profileQuery.data.tel}</p>
            <p>Роль = {JSON.stringify(profileQuery.data.roles)}</p>
            <Link to={Nav.main()}>Перейти на главную</Link>
        </div>
    );
}
