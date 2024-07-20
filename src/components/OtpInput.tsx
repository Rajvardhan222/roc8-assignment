import React, { useEffect, useRef, useState } from "react";

function OtpInput({ length, setOtp }) {
  let [otpField, setOtpFields] = useState(new Array(length).fill(""));

  let inputRef = useRef([]);

  useEffect(() => {
    if (inputRef[0]) inputRef.current[0].focus();
  }, []);
  let handleOtpChange = (index, e) => {
    let value = e.target.value;

    if (isNaN(value)) return;
    let newOtp = [...otpField];

    newOtp[index] = value.substring(value.length - 1);
    setOtpFields(newOtp)
    

    let textOtp = newOtp.join("");

    console.log(textOtp);

    if (textOtp.length == length) {
        setOtp(textOtp);
    }

    //move to next input box

    if (value && index < length - 1 && inputRef.current[index + 1]) {
      inputRef.current[index + 1].focus();
    }
  };

  let handleKeyDown = (index, e) => {
    if (
      e.key == "Backspace" &&
      !otpField[index] &&
      index > 0 &&
      inputRef.current[index - 1]
    ) {
      inputRef.current[index - 1].focus();
    }
  };
  return (
    <div>
      {otpField.map((value, index) => {
        return (
          <input
            ref={(input) => (inputRef.current[index] = input)}
            type="text"
            value={otpField[index]}
            onChange={(e) => handleOtpChange(index, e)}
            className="ml-3 h-16 w-16 border-[2px] border-black pl-5 text-2xl outline-none"
            maxLength={1}
            key={index}
            onKeyDown={(e) => handleKeyDown(index, e)}
          />
        );
      })}
    </div>
  );
}

export default OtpInput;
