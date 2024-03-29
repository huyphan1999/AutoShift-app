export const getParams = (props) => props.navigation.state.params;

export const getParamsHeader = (navigation) => navigation.state.params;

//Group data by key
var group = function(arr, key) {
  return arr.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x.data);
    return rv;
  }, {});
};

//Transform to Section data
export const transformSection = (data) => {
  let result = [];
  var groupBy = group(data, "date");
  let keys = Object.keys(groupBy);
  keys.forEach((key) => {
    oject = { date: key, data: groupBy[key] };
    result.push(oject);
  });
  return result;
};

export const unsignedString = (string) => {
  const signedChars =
    "àảãáạăằẳẵắặâầẩẫấậđèẻẽéẹêềểễếệìỉĩíịòỏõóọôồổỗốộơờởỡớợùủũúụưừửữứựỳỷỹýỵÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬĐÈẺẼÉẸÊỀỂỄẾỆÌỈĨÍỊÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢÙỦŨÚỤƯỪỬỮỨỰỲỶỸÝỴ";
  const unsignedChars =
    "aaaaaaaaaaaaaaaaadeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyAAAAAAAAAAAAAAAAADEEEEEEEEEEEIIIIIOOOOOOOOOOOOOOOOOUUUUUUUUUUUYYYYY";
  const pattern = new RegExp(`[${signedChars}]`, "g");
  const output = string.replace(pattern, (m, key, value) =>
    unsignedChars.charAt(signedChars.indexOf(m))
  );
  return output.replace(" ", "_");
};
