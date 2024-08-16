import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "../ui/input-otp";
  
  export default function AuthOTP( {setOTP} : any) {
    const handleOtpChange = (otp: string) => {
      // console.log(otp);
      setOTP(otp);
    };
  
    return (
      <div className="m-3">
        <InputOTP maxLength={6} onChange={handleOtpChange}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
    );
  }
  