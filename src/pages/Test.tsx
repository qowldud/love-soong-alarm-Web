import { useState } from "react";
import { Button } from "../common/Button";
import { Header } from "../common/Header";
import { Input } from "../common/Input";

export const Test = () => {
  const [value, setValue] = useState("");
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-4">
        <Header title="프로필 수정" />
        <Button variant="secondary">건너뛰기</Button>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClear={() => setValue("")}
          placeholder="예시)165cm"
          label="키"
        />
      </div>
    </div>
  );
};
