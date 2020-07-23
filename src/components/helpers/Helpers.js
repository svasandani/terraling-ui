function ActionToPastTense(action) {
  if (action.toLowerCase() === "new") return action;
  else if (action.charAt(action.length - 1) === "e") return action + "d";
  else return action + "ed";
}

function TargetToPlural(count, target) {
  if (count > 1) {
    if (target.toLowerCase() === "property") return "properties";
    else return target.toLowerCase() + "s";
  } else return target.toLowerCase();
}

export { ActionToPastTense, TargetToPlural };
