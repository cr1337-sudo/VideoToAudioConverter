import fs from 'fs'
import {user} from '../controllers/types/userController'

function getUsers(): Array<user> {
    const data = fs.readFileSync('./src/users.json', 'utf-8')
     
    return JSON.parse(data).usuarios
}
const User: any = {
    mail: null,
    name: "jose",
    password: "clave123"
}

describe('/POST register', () => {
    test('should fail if any property is empty or null', async () => {
     
        expect(User.name.trim()).toBeTruthy()
        expect(User.mail.trim()).toBeTruthy()
        expect(User.password.trim()).toBeTruthy()
      
    
    })
}) 

describe('/GET login', () => {
    test('shoul fail if any property is empty', () => {
        expect(User.mail.trim()).toBeTruthy()
        expect(User.password.trim()).toBeTruthy()
    })
    test('should fail if any property doesnt match', () =>{
        const allUsers = getUsers()
        const userFind = allUsers.find(user => user.mail === User.mail && user.password === User.password)
        expect(userFind).toBeTruthy()
        
    })
})

