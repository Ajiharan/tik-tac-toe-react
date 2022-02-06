const useRules = function () {
  const checkXMatch = (i, temp) => {
    while (i <= 6) {
      if (temp[i] && temp[i] === temp[i + 1] && temp[i + 1] === temp[i + 2]) {
        return true;
      }
      i = (i + 1) * 3;
    }
    return false;
  };
  const checkYMatch = (i, temp) => {
    while (i <= 2) {
      if (temp[i] && temp[i] === temp[i + 3] && temp[i + 3] === temp[i + 6]) {
        return true;
      }
      i = i + 1;
    }
    return false;
  };
  const checkCrossMatch = (i, temp) => {
    if (
      temp[i] === temp[(i + 1) * 4] &&
      temp[(i + 1) * 4] === temp[(i + 2) * 4] &&
      temp[i]
    ) {
      return true;
    }
    i = 2;
    if (
      temp[i] &&
      temp[i] === temp[i * 2] &&
      temp[i * 2] === temp[(i + 1) * 2]
    ) {
      return true;
    }
    return false;
  };

  return { checkCrossMatch, checkXMatch, checkYMatch };
};

export default useRules;
