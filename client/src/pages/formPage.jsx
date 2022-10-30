import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useForm } from "react-hook-form";


export const ReactHookFormDemo = ({setUser}) => {



    const { register, handleSubmit, formState: { errors } } = useForm();


    const submitHandler = (data) => {
        localStorage.setItem('tifUser',data.name);
        setUser(data.name)
    };

    return (
        <div className="flex align-items-center justify-content-center" >
            <form
                onSubmit={handleSubmit(submitHandler)}
                className="b mt-8 p-2 border-round">
                <strong>Register</strong>
                <span className="p-float-label flex align-items-center justify-content-center mt-4" >
                    <InputText id="in" {...register('name', { required: 'Name is required!' })} name='name' rules={{ required: 'Name is required.' }} />
                    <label htmlFor="in">Username</label>
                </span>
                {errors?.name && <div className='p-error'>{errors?.name?.message}</div>}

                <span className="p-float-label flex align-items-center justify-content-center mt-4" >
                    <InputText id="in" name='email' {...register('email', { required: 'Email is required!',pattern:{value:/^\S+@\S+\.\S+$/,message:"Enter Valid Email"} })} />
                    <label htmlFor="in">Email</label>
                </span>
                {errors?.email && <div className='p-error'>{errors?.email?.message}</div>}
                <Button label="Submit" className='mt-4 p-button-success' rules={{ required: 'Name is required.' }} />
            </form>
        </div>
    )
}