import { account } from '../appwrite/appwriteClient.js';
import { databases, Query, MDBID, USERSCOL, ID } from '../appwrite/appwriteClient.js';

export async function handleFirstLogin() {
    // 1. Получаем текущего авторизованного пользователя
    const user = await account.get();

    // 2. Проверяем, существует ли пользователь в нашей кастомной коллекции users
    const existing = await databases.listDocuments(
        MDBID,
        USERSCOL,
        [Query.equal("appwriteId", user.$id)]
    );

    if (existing.total > 0) {
        console.log("User already exists in custom users table"); //Пользователь уже существует в таблице users
        return existing.documents[0];
    }

    // 3. Создаём новую запись пользователя
    const newUser = await databases.createDocument(
        MDBID,
        USERSCOL,
        ID.unique(), // авто-генерация ID
        {
            appwriteId: user.$id,
            email: user.email,
            username: user.name,
            role: "user"
        }
    );

    console.log("Created new user record:", newUser);//Создана новая запись пользователя
    return newUser;
}