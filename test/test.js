let result = [1, 2, 3, 4, 5]
    .filter(x => x > 2)        // 筛选出大于 2 的数字
    .map(x => x * 2)           // 将筛选出来的数字乘以 2
    .reduce((sum, x) => sum + x, 0);  // 对结果进行累加

console.log(result); 