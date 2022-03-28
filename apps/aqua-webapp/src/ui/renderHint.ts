import { Hint } from "src/utils/hint";

export function renderHint(): string {
  let hintString = "";
  for (const [key, value] of Object.entries(Hint)) {
    hintString += `  <div class="radioElement">
    <input type="radio" id="${key}}"
     name="hint" value="${key}" ${key !== "none" ? "" : "checked"}>
    <label  for="${key}">${value}</label>
  
  </div>`;
  }

  return hintString;
}
