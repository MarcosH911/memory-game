function waitFor(conditionFunction: () => boolean, interval: number) {
  const poll = (resolve: any) => {
    if (conditionFunction()) {
      resolve();
    } else {
      setTimeout(() => poll(resolve), interval);
    }
  };

  return new Promise(poll);
}

export default waitFor;
