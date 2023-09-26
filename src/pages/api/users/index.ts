import { getUsers } from "../../data/users";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  const users = await getUsers();
  var totalAge = users.reduce(function (total, user) {
    return total + user.age;
  }, 0);
  if (req.query.search) {
    const searchQuery = req.query.search.toLowerCase();
    const results = users.filter((user) => {
      return user.firstName.toLowerCase().includes(searchQuery);
    });
    results.forEach((user) => {
      let resultado = `${user.firstName} ${user.lastName}`;
      console.log(resultado);
    });
  }

  const resultado = Math.floor(totalAge / users.length);
  return res.status(200).json({ users, averageAge: resultado });
}
