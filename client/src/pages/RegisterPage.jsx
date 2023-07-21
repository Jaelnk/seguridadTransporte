import { useForm } from "react-hook-form";
//import { registerRequest } from "../api/auth";
import {useAuth} from "../context/authContext"
/* import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; */



function RegisterPage() {
    const { register, handleSubmit } = useForm();
    const {signup, user } = useAuth();
    console.log(user);
    
    const onSubmit = async (values) => {
        signup(values);
    };
    
/*     const navigate = useNavigate();
    useEffect(() => {
        console.log("Auth: ",isAuthenticated);
        if (isAuthenticated) navigate("/index");
      }, [isAuthenticated]);
 */
    

    return (
        <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
            type="text"
            {...register("username", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 rounded-md my-2"
            placeholder="username"
            />

            <input
            type="text"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 rounded-md my-2"
            placeholder="email"
            />

            <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 rounded-md my-2"
            placeholder="password"
            />

            <input
            type="text"
            {...register("nombre", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 rounded-md my-2"
            placeholder="nombre"
            />

            <input
            type="text"
            {...register("apellido", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 rounded-md my-2"
            placeholder="apellido"
            />

            <input
            type="text"
            {...register("dni", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 rounded-md my-2"
            placeholder="dni"
            />

            <input
            type="text"
            {...register("telf", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 rounded-md my-2"
            placeholder="telf"
            />

            <input
            type="text"
            {...register("estado", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 rounded-md my-2"
            placeholder="estado"
            />

            <input
            type="text"
            {...register("roleName", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 rounded-md my-2"
            placeholder="Rol"
            />

            <button type="submit">Register</button>
        </form>
        </div>
    );
}

export default RegisterPage;
