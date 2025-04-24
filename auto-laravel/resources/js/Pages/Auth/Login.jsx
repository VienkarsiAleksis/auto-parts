import { useEffect } from 'react';
import Checkbox from '@/Pages/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Pages/Components/InputError';
import InputLabel from '@/Pages/Components/InputLabel';
import PrimaryButton from '@/Pages/Components/PrimaryButton';
import TextInput from '@/Pages/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600 ">{status}</div>}

            <form onSubmit={submit} className='mt-6 px-6 py-4 w-[60%]'>
                <div>
                    <InputLabel htmlFor="email" value="E-pasts" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Parole" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('register')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Vel neesi reģistrējies?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Pieslēgties
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
