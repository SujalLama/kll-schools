export const GET_SCHOOL_QUERY = `
    [out:json][timeout:2500];
    (
      node["amenity"="school"][name]
      (27.684288135257813,85.25922775268555,27.735655344273848,85.38454055786133);
      node["amenity"="school"]["name:en"]
      (27.684288135257813,85.25922775268555,27.735655344273848,85.38454055786133);
      way["amenity"="school"][name]
      (27.684288135257813,85.25922775268555,27.735655344273848,85.38454055786133);
    );
    out body;
    >;
    out skel qt;`;

 export function generateQueryBasedOnSearchTerm(term) {
      return `
        [out:json][timeout:2500];
        (
          way["amenity"="school"]["name"~"^${term}",i]
          (27.684288135257813,85.25922775268555,27.735655344273848,85.38454055786133);
        );
        out body;
        >;
        out skel qt;
        `
    }

export  function generateAccumulatedQueryWithCount(type, operator, empMin, empMax, stuMin, stuMax) {
      if(type === "all_type" && operator === "all_operator") {
        return `
              [out:json][timeout:2500];
              (
                way["amenity"="school"]
                (if:t["personnel:count"]<=${empMax})(if:t["personnel:count"]>=${empMin})
                (if:t["student:count"]<=${stuMax})(if:t["student:count"]>=${stuMin})
                (27.684288135257813,85.25922775268555,27.735655344273848,85.38454055786133);
              );
              out body;
              >;
              out skel qt;`
      }

      if(type !== "all_type" && operator !== "all_operator") {
        return `
              [out:json][timeout:2500];
              (
                node["amenity"="school"]["isced:level" = "${type}"]["operator:type" = "${operator}"]
                (27.684288135257813,85.25922775268555,27.735655344273848,85.38454055786133);
                way["amenity"="school"]["isced:level" = "${type}"]["operator:type" = "${operator}"]
                (if:t["personnel:count"]<=${empMax})(if:t["personnel:count"]>=${empMin})
                (if:t["student:count"]<=${stuMax})(if:t["student:count"]>=${stuMin})
                (27.684288135257813,85.25922775268555,27.735655344273848,85.38454055786133);
              );
              out body;
              >;
              out skel qt;`
      }

      if(type !== "all_type" && operator === "all_operator") {
        return `
              [out:json][timeout:2500];
              (
                node["amenity"="school"]["isced:level" = "${type}"]
                (27.684288135257813,85.25922775268555,27.735655344273848,85.38454055786133);
                way["amenity"="school"]["isced:level" = "${type}"]
                (if:t["personnel:count"]<=${empMax})(if:t["personnel:count"]>=${empMin})
                (if:t["student:count"]<=${stuMax})(if:t["student:count"]>=${stuMin})
                (27.684288135257813,85.25922775268555,27.735655344273848,85.38454055786133);
              );
              out body;
              >;
              out skel qt;`
      }

      if(type === "all_type" && operator !== "all_operator") {
        return `
              [out:json][timeout:2500];
              (
                node["amenity"="school"]["operator:type" = "${operator}"]
                (27.684288135257813,85.25922775268555,27.735655344273848,85.38454055786133);
                way["amenity"="school"]["operator:type" = "${operator}"]
                (if:t["personnel:count"]<=${empMax})(if:t["personnel:count"]>=${empMin})
                (if:t["student:count"]<=${stuMax})(if:t["student:count"]>=${stuMin})
                (27.684288135257813,85.25922775268555,27.735655344273848,85.38454055786133);
              );
              out body;
              >;
              out skel qt;`
      }
    }

export function generateAccumulatedQueryWithoutCount(type, operator) {
    console.log(type, operator);
      if(type !== "all_type" && operator !== "all_operator") {
        return `
              [out:json][timeout:2500];
              (
                node["amenity"="school"]["isced:level" = "${type}"]["operator:type" = "${operator}"]
                (27.684288135257813,85.25922775268555,27.735655344273848,85.38454055786133);
                way["amenity"="school"]["isced:level" = "${type}"]["operator:type" = "${operator}"]
                (27.684288135257813,85.25922775268555,27.735655344273848,85.38454055786133);
              );
              out body;
              >;
              out skel qt;`
      }

      if(type !== "all_type" && operator === "all_operator") {
        return `
              [out:json][timeout:2500];
              (
                node["amenity"="school"]["isced:level" = "${type}"]
                (27.684288135257813,85.25922775268555,27.735655344273848,85.38454055786133);
                way["amenity"="school"]["isced:level" = "${type}"]
                (27.684288135257813,85.25922775268555,27.735655344273848,85.38454055786133);
              );
              out body;
              >;
              out skel qt;`
      }

      if(type === "all_type" && operator !== "all_operator") {
        return `
              [out:json][timeout:2500];
              (
                node["amenity"="school"]["operator:type" = "${operator}"]
                (27.684288135257813,85.25922775268555,27.735655344273848,85.38454055786133);
                way["amenity"="school"]["operator:type" = "${operator}"]
                (27.684288135257813,85.25922775268555,27.735655344273848,85.38454055786133);
              );
              out body;
              >;
              out skel qt;`
      }
    }
