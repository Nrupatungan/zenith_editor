import React from 'react'
import SignUpForm from './_components/signup-form'

const RegisterPage = () => {
    return (
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <SignUpForm/>
        </div>
      </div>
    )
}

export default RegisterPage