const main = () => {
  const phase1 = document.querySelectorAll(".html-fragment");
  const phase1mobile = document.querySelectorAll(".embed-fragment");
  const phase2 = document.querySelectorAll(".view-html-fragment-embedded");

  const fragmentsLists = [phase1, phase1mobile, phase2];

  for (const fragments of fragmentsLists) {
    for (const fragment of fragments) {
      fragment.classList.add("u-full");
    }
  }
};

export default main;
