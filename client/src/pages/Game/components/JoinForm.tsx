import React, { FormEvent, useState } from "react";

interface JoinFormProps {
  onSubmit: Function;
}

const JoinForm = ({ onSubmit }: JoinFormProps) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({ name });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </form>
    </div>
  );
};

export default JoinForm;
