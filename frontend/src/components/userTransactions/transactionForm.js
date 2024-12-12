import { useForm } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function TransactionForm({ categories, onSubmit, isSaving, transaction, onDelete }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: transaction || {}
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* existing fields... */}
            <div className="input-box">
                <label>Currency</label>
                <select {...register('currency', { required: true })}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="JPY">JPY</option>
                    {/* Add more currencies as needed */}
                </select>
                {errors.currency && <span>This field is required</span>}
            </div>
            {/* submit button... */}
        </form>
    );
}

export default TransactionForm;