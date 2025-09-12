import {
  FilterCheckbox,
  RangeSlider,
  Title,
  CheckboxFiltersGroup,
} from "@/components/shared";
import React from "react";
import { Input } from "../ui";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Title text="Фшльтрація" size="sm" className="mb-5 font-bold" />
      {/* Верхні чекбокси */}
      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Можно зібрати" value="1" />
        <FilterCheckbox text="Новинки" value="2" />
      </div>
      {/* Фільтир ціни */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Ціна від і до</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            defaultValue={0}
          />
          <Input type="number" placeholder="1000" min={100} max={1000} />
        </div>
        <RangeSlider min={0} max={1000} step={10} value={[0, 1000]} />
      </div>
      <CheckboxFiltersGroup
        title="Інгредієнти"
        className="mt-5"
        limit={5}
        defultItem={[
          {
            text: "Сирний соус",
            value: "1",
          },
          {
            text: "Пармезан",
            value: "2",
          },
          {
            text: "Моцарела",
            value: "3",
          },
          {
            text: "Базилік",
            value: "4",
          },
          { text: "Чеддер", value: "5" },
          { text: "Песто", value: "6" },
          { text: "Томати", value: "7" },
          { text: "Чеддер", value: "5" },
          { text: "Песто", value: "6" },
          { text: "Томати", value: "7" },
          { text: "Чеддер", value: "5" },
          { text: "Песто", value: "6" },
          { text: "Томати", value: "7" },
        ]}
        items={[
          {
            text: "Сирний соус",
            value: "1",
          },
          {
            text: "Пармезан",
            value: "2",
          },
          {
            text: "Моцарела",
            value: "3",
          },
          {
            text: "Базилік",
            value: "4",
          },
          { text: "Чеддер", value: "5" },
          { text: "Песто", value: "6" },
          { text: "Томати", value: "7" },
          { text: "Чеддер", value: "5" },
          { text: "Песто", value: "6" },
          { text: "Томати", value: "7" },
          { text: "Чеддер", value: "5" },
          { text: "Песто", value: "6" },
          { text: "Томати", value: "7" },
        ]}
      />
    </div>
  );
};
