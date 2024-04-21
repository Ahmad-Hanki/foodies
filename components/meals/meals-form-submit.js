'use client'
import {useFormStatus} from 'react-dom'
// must be inside the form 

function MealsFormSubmit() {
    const { pending } = useFormStatus();
  return (
    <button type='submit' disabled = {pending}>
        {!pending? 'SHARE MEAL' : 'SUBMITTING...'}
    </button>
  )
}

export default MealsFormSubmit