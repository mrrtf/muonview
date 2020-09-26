import expect from "expect";
import * as categories from "./categories";

describe("isValidCategory", () => {
  it("{de,Detection Element} should be a valid category", () => {
    expect(
      categories.isValidCategory({
        key: categories.de.key,
        name: categories.de.name,
      })
    ).toBe(true);
  });
});

describe("convertId", () => {
  it("convert anything to same should be identity", () => {
    let id = { deid: null };
    expect(categories.convertId(id, categories.de)).toBe(id);
    id = { deid: null, bending: null };
    expect(categories.convertId(id, categories.deplane)).toBe(id);
    id = { deid: null, dsid: null };
    expect(categories.convertId(id, categories.ds)).toBe(id);
  });
  it("convert from de", () => {
    expect(categories.convertId({ deid: 102 }, categories.ds)).toStrictEqual({
      deid: 102,
      dsid: null,
    });
    expect(
      categories.convertId({ deid: 102 }, categories.deplane)
    ).toStrictEqual({
      deid: 102,
      bending: null,
    });
  });
});

describe("whatis", () => {
  it("deid should be de", () => {
    expect(categories.whatis({ deid: null })).toBe(categories.de);
    expect(categories.whatis({ deid: undefined })).toBe(categories.de);
    expect(categories.whatis({ deid: "toto" })).toBe(categories.de);
    expect(categories.whatis({ deid: 1025 })).toBe(categories.de);
  });
  it("deid,bending should be detection element plane", () => {
    expect(categories.whatis({ deid: null, bending: null })).toBe(
      categories.deplane
    );
  });
  it("deid,dsid should be dual sampa", () => {
    expect(categories.whatis({ deid: null, dsid: null })).toBe(categories.ds);
  });
  it("deid,bending,dsid should be dual sampa", () => {
    expect(categories.whatis({ deid: null, bending: null, dsid: null })).toBe(
      categories.ds
    );
  });
  it("deid:null,bending:null,dsid:null should be dual sampa", () => {
    expect(categories.whatis({ deid: null, bending: null, dsid: null })).toBe(
      categories.ds
    );
  });
  it("deid:null, bending:null, dsid:null, dsch: null should be pad", () => {
    expect(
      categories.whatis({
        deid: null,
        bending: null,
        dsid: null,
        dsch: null,
      })
    ).toBe(categories.pad);
  });
  it("deid:null, padid: null should be pad", () => {
    expect(categories.whatis({ deid: null, padid: null })).toBe(categories.pad);
  });
});

describe("parent", () => {
  it("deid:819 dsid:1 parent should be deid:819", () => {
    expect(categories.parent({ deid: 819, dsid: 1 })).toStrictEqual({
      deid: 819,
    });
  });
  it("deid:819 padid:1 parent should be deid:819 ", () => {
    expect(categories.parent({ deid: 819, padid: 1 })).toStrictEqual({
      deid: 819,
    });
  });
  it("deid:819 dsid:1 dsch:1 parent should be deid:819 dsid:1", () => {
    expect(categories.parent({ deid: 819, dsid: 1, dsch: 1 })).toStrictEqual({
      deid: 819,
      dsid: 1,
    });
  });
});

describe("isValid", () => {
  it("deid:null should be invalid", () => {
    expect(categories.isValid({ deid: null })).toBe(false);
  });
  it("deid:501 should be valid", () => {
    expect(categories.isValid({ deid: 501 })).toBe(true);
  });
  it("deid:100 should be valid", () => {
    expect(categories.isValid({ deid: 100 })).toBe(true);
  });
  it("deid:104 should be invalid", () => {
    expect(categories.isValid({ deid: 104 })).toBe(false);
  });
  it("deid:null,bending:null,dsid:null should be invalid", () => {
    expect(categories.isValid({ deid: null, bending: null, dsid: null })).toBe(
      false
    );
  });
  it("deid:501,bending:true,dsid:2 should be valid", () => {
    expect(categories.isValid({ deid: 501, bending: true, dsid: 2 })).toBe(
      true
    );
  });
  it("deid:501,dsid:2,dsch:3 should be valid", () => {
    expect(categories.isValid({ deid: 501, dsid: 2, dsch: 3 })).toBe(true);
  });
  it("deid:501,padid:3 should be valid", () => {
    expect(categories.isValid({ deid: 501, padid: 3 })).toBe(true);
  });
});

describe("nameAll", () => {
  it("deid:null should be All Detection Elements", () => {
    expect(categories.nameAll({ deid: null })).toBe("All Detection Elements");
  });
  it("deid:null bending:null should be All Planes", () => {
    expect(categories.nameAll({ deid: null, bending: null })).toBe(
      "All Planes"
    );
  });
  it("deid:null bending:null dsid:null should be All Dual Sampas", () => {
    expect(categories.nameAll({ deid: null, bending: null, dsid: null })).toBe(
      "All Dual Sampas"
    );
  });
  it("deid:null dsid:null should be All Dual Sampas", () => {
    expect(categories.nameAll({ deid: null, dsid: null })).toBe(
      "All Dual Sampas"
    );
  });
  it("deid:510 dsid:null should be Detection Element 510 All Dual Sampas", () => {
    expect(categories.nameAll({ deid: 510, dsid: null })).toBe(
      "Detection Element 510 All Dual Sampas"
    );
  });

  it("deid:510 dsid:1 dsch:null should be Detection Element 510 Dual Sampa 1 All Pads", () => {
    expect(categories.nameAll({ deid: 510, dsid: 1, dsch: null })).toBe(
      "Detection Element 510 Dual Sampa 1 All Pads"
    );
  });

  it("deid:510 padid:null should be Detection Element 510 All Pads", () => {
    expect(categories.nameAll({ deid: 510, padid: null })).toBe(
      "Detection Element 510 All Pads"
    );
  });

  it("deid:510 bending:true padid:null should be Detection Element 510 Bending Plane All Pads", () => {
    expect(categories.nameAll({ deid: 510, bending: true, padid: null })).toBe(
      "Detection Element 510 Bending Plane All Pads"
    );
  });

  it("deid:510 bending:false padid:null should be Detection Element 510 Non-Bending Plane All Pads", () => {
    expect(categories.nameAll({ deid: 510, bending: false, padid: null })).toBe(
      "Detection Element 510 Non-Bending Plane All Pads"
    );
  });
});

describe("describe", () => {
  it("deid:null should be All Detection Elements", () => {
    expect(categories.describeId({ deid: null })).toBe(
      "All Detection Elements"
    );
  });
  it("deid:501 should be Detection Element 501", () => {
    expect(categories.describeId({ deid: 501 })).toBe("Detection Element 501");
  });
  it("deid:null,bending:null should be All Planes", () => {
    expect(categories.describeId({ deid: null, bending: null })).toBe(
      "All Planes"
    );
  });
  it("deid:501,bending:true should be Detection Element Plane 501 (Bending)", () => {
    expect(categories.describeId({ deid: 501, bending: true })).toBe(
      "Detection Element 501 Bending Plane"
    );
  });
  it("deid:501,bending:false should be Detection Element Plane 501 (Non-Bending)", () => {
    expect(categories.describeId({ deid: 501, bending: false })).toBe(
      "Detection Element 501 Non-Bending Plane"
    );
  });
  it("deid:null,bending:null,dsid:null should be All Dual Sampas", () => {
    expect(
      categories.describeId({ deid: null, bending: null, dsid: null })
    ).toBe("All Dual Sampas");
  });
  it("deid:501,dsid:null should be Detection Element 501 all ds", () => {
    expect(categories.describeId({ deid: 501, dsid: null })).toBe(
      "Detection Element 501 All Dual Sampas"
    );
  });
  it("deid:501,bending:true,dsid:2 should be Detection Element Plane 501 (Bending) Dual Sampa 2", () => {
    expect(categories.describeId({ deid: 501, bending: true, dsid: 2 })).toBe(
      "Detection Element 501 Bending Plane Dual Sampa 2"
    );
  });
  it("deid:501,dsid:2,dsch:3 should be Detection Element Plane 501 Bending Plane Dual Sampa 2 Channel 3", () => {
    expect(categories.describeId({ deid: 501, dsid: 2, dsch: 3 })).toBe(
      "Detection Element 501 Dual Sampa 2 Channel 3"
    );
  });
  it("deid:501,padid:1 should be Detection Element Plane 501 Bending Plane PadId 1", () => {
    expect(categories.describeId({ deid: 501, padid: 1 })).toBe(
      "Detection Element 501 PadId 1"
    );
  });
});

describe("replace", () => {
  it("shoud replace space", () => {
    expect("a b c".replace(/ /g, "-")).toBe("a-b-c");
  });
});

describe("isSpecific", () => {
  it("deid:null should not be specific", () => {
    expect(categories.isSpecific({ deid: null })).toBe(false);
  });
  it("deid:501 should be specific", () => {
    expect(categories.isSpecific({ deid: 501 })).toBe(true);
  });
  it("deid:501 bending:null should not be specific", () => {
    expect(categories.isSpecific({ deid: 501, bending: null })).toBe(false);
  });
  it("deid:501 bending:true should be specific", () => {
    expect(categories.isSpecific({ deid: 501, bending: true })).toBe(true);
  });
  it("deid:501 bending:false dsid should not be specific", () => {
    expect(
      categories.isSpecific({ deid: 501, bending: false, dsid: null })
    ).toBe(false);
  });
  it("deid:501 dsid:null should not be specific", () => {
    expect(categories.isSpecific({ deid: 501, dsid: null })).toBe(false);
  });
  it("deid:501 dsid:1024 should be specific", () => {
    expect(categories.isSpecific({ deid: 501, dsid: 1024 })).toBe(true);
  });
  it("deid:501 padid:1 should be specific", () => {
    expect(categories.isSpecific({ deid: 501, padid: 1 })).toBe(true);
  });
  it("deid:501 padid:null should not be specific", () => {
    expect(categories.isSpecific({ deid: 501, padid: null })).toBe(false);
  });
});

describe("decode", () => {
  it("decode 1-2-3 should yield id={deid:1,dsid:2,dsch:3}", () => {
    const expected = { deid: 1, dsid: 2, dsch: 3 };
    expect(categories.decode("1-2-3")).toStrictEqual(expected);
  });
});
