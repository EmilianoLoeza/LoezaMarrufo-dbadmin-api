import { Request, Response } from 'express';


// GET /api/users
export const getUsers = (req: Request, res: Response) => {
    const user=
    {
        name:"Emiliano",
        lastname:"Loeza",
        email:"[Emiliano20061501@gmail.com]",
        age:21,
        active:true,
        subjects:["Metodologia", "Proyectos", "Programacion"],

    }
    res.json({
        code: "200_OK",
        data:user
    });
};

export const getUserById=(req: Request, res: Response) => {
    
    

    res.json({
        code: "200_OK",
        data: {
            id: req.params.id,
            name: "Carlos",
            lastname: "Mendoza"
        }
    });
};