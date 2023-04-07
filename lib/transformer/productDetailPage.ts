export function getSunglassCategoryMesurementDetails(attributes) {
  const lensMeasurementMap = new Map();
  lensMeasurementMap.set("Lens Width", 0.0);
  lensMeasurementMap.set("Temple Width", 0.0);
  lensMeasurementMap.set("Bridge Width", 0.0);
  lensMeasurementMap.set("Frame Width", 0.0);
  attributes.forEach((attribute) => {
    if (attribute.values[0]) {
      if (attribute.attribute.name && attribute.values[0].name) {
        if (lensMeasurementMap.has(attribute.attribute.name)) {
          lensMeasurementMap.set(
            attribute.attribute.name,
            attribute.values[0].name
          );
        }
      }
    }
  });

  if (lensMeasurementMap.values()) {
    return Array.from(lensMeasurementMap.values());
  }
  return null;
}

export function getProductDetails(attributes) {
  const pdpNameMapping = new Map();
  pdpNameMapping.set("Frame Material", "Material");
  pdpNameMapping.set("Product Code", "Product");

  let ignorePdpAttributes = new Set([
    "Bridge Width",
    "Features",
    "Frame Width",
    "Lens Width",
    "Temple Width",
    "Fit",
  ]);

  let productAttributes = {};
  let pdpDetails = {};

  attributes.forEach((attribute) => {
    if (attribute.values[0]) {
      if (attribute.attribute.name && attribute.values[0].name) {
        let fieldName = "";
        if (pdpNameMapping.has(attribute.attribute.name)) {
          fieldName = pdpNameMapping.get(attribute.attribute.name);
        } else {
          fieldName = attribute.attribute.name;
        }
        if (!ignorePdpAttributes.has(attribute.attribute.name)) {
          productAttributes[fieldName] = attribute.values[0].name;
        }
      }
    }
  });
  return Object.entries(productAttributes);
}

export function getProductFeatures(attributes) {
  let productFeatures = [];
  attributes.forEach((attribute) => {
    if (attribute.values[0]) {
      if (attribute.attribute.name === "Features") {
        if (attribute?.values[0]?.richText) {
          let data = JSON.parse(attribute?.values[0]?.richText);
          productFeatures = data.blocks[0].data?.items;
        }
      }
    }
  });

  return productFeatures;
}
