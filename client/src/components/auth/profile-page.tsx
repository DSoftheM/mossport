import { useProfileQuery } from "../../provider/query/use-profile-query";

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
        </div>
    );
}
