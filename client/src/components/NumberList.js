import React from "react";
import { Pre } from "rebass";
import styled from "styled-components";

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

export { NumberList };