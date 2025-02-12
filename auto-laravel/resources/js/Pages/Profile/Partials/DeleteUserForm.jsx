import { useRef, useState } from 'react';
import DangerButton from '@/Pages/Components/DangerButton';
import InputError from '@/Pages/Components/InputError';
import InputLabel from '@/Pages/Components/InputLabel';
import Modal from '@/Pages/Components/Modal';
import SecondaryButton from '@/Pages/Components/SecondaryButton';
import TextInput from '@/Pages/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Dzēst kontu</h2>

                <p className="mt-1 text-sm text-gray-600">
                Kad jūsu konts tiks dzēsts, visi tā resursi un dati tiks neatgriezeniski dzēsti. Pirms tam
                dzēšot savu kontu, lūdzu, lejupielādējiet visus datus vai informāciju, ko vēlaties saglabāt.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>Dzēst kontu</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Vai tiešām vēlaties dzēst savu kontu?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Kad jūsu konts tiks dzēsts, visi tā resursi un dati tiks neatgriezeniski dzēsti. Lūdzu
                        ievadiet savu paroli, lai apstiprinātu, ka vēlaties neatgriezeniski dzēst savu kontu.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Password" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Parole"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Atcelt</SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Dzēst kontu
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
