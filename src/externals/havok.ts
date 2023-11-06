// import HavokPlugin from "@babylonjs/havok";

// export const havokModule = HavokPlugin();

import HavokPhysics from "https://cdn.babylonjs.com/havok/HavokPhysics_es.js";
  let havokInstance;
  HavokPhysics().then((havok:any) => {
    // Havok is now available
    havokInstance = havok;
  });
