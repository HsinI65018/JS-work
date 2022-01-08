const btn = document.querySelector('.btn');
const body = document.querySelector('body');
let url = 'https://raw.githubusercontent.com/HsinI65018/JS-work/main/tsmc%20option%20web/2330.json';
fetch(url).then(response =>{
	return response.json()
}).then(json =>{
	body.onload = function(){
		let data = json;
		init(data);
	}
	btn.onclick = function(e){
		e.preventDefault();
		let data = json;
		FilterData(data);
	}
}).catch(e =>{alert(e)});

function FilterData(data) {
	const date1 = document.querySelector('#date1');
	const date2 = document.querySelector('#date2');
	const option = document.querySelector('#option');
	//console.log(option.value)
	const optionValue = option.value;
	const price = document.querySelector('#price');
	const priceValue = price.value;
	//const display = document.querySelector('.display');

	// Check if the value validate
	if (date1.value === '' || date2.value === '') {
		alert('請輸入正確之日期區間');
		btn.style = disable;
	}else if (optionValue === '--') {
		alert('請買權或賣權');
		btn.style = disable;
	}else if (priceValue === '--') {
		alert('請選擇價平、價內或價外');
		btn.style = disable;
	}
	
	filterData = data
		.filter(data => data.Date >= date1.value && data.Date <= date2.value)
		.sort((data1,data2) => data1.Date > data2.Date ? 1:-1 )
	console.log(filterData)	

	// 自動清除資料
	const articles = document.querySelectorAll('article');
	if (articles) {
		articles.forEach(article => article.remove());
	}

	// 進階篩選
	// item change to option!!!
	resultData = filterData.filter(data => data.Option === optionValue  && data.PriceLevel === priceValue);
	console.log(resultData)
	DisplayData(resultData);
}

function DisplayData(resultData){
	for (let i = 0; i < resultData.length; i++) {
		const border = document.querySelector('.board')
		const myArticle = document.createElement('article');
		const myPara1 = document.createElement('div');
		const myPara2 = document.createElement('div');
		const myPara3 = document.createElement('div');
		const myPara4 = document.createElement('div');
		const myPara5 = document.createElement('div');

		if (i%2 !== 0) {
			myPara1.setAttribute('class','odd');
			myPara1.textContent = resultData[i].Date;
			myPara2.setAttribute('class','odd');
			myPara2.textContent = resultData[i].Due_Date;
			myPara3.setAttribute('class','odd');
			myPara3.textContent = resultData[i].Price;
			myPara4.setAttribute('class','odd');
			myPara4.textContent = resultData[i].C;

			if (resultData[i].PC >=0) {
				myPara5.setAttribute('class','odd positive');
			}else if (resultData[i].PC <0) {
				myPara5.setAttribute('class','odd negative');
			}
			//myPara5.setAttribute('class','odd');
			myPara5.textContent = resultData[i].PC;
		}else{
			myPara1.setAttribute('class','even');
			myPara1.textContent = resultData[i].Date;
			myPara2.setAttribute('class','even');
			myPara2.textContent = resultData[i].Due_Date;
			myPara3.setAttribute('class','even');
			myPara3.textContent = resultData[i].Price;
			myPara4.setAttribute('class','even');
			myPara4.textContent = resultData[i].C;

			if (resultData[i].PC >=0) {
				myPara5.setAttribute('class','even positive');
			}else if (resultData[i].PC <0) {
				myPara5.setAttribute('class','even negative');
			}
			myPara5.textContent = resultData[i].PC;
		}

		myArticle.appendChild(myPara1);
		myArticle.appendChild(myPara2);
		myArticle.appendChild(myPara3);
		myArticle.appendChild(myPara4);
		myArticle.appendChild(myPara5);
		
		border.appendChild(myArticle)
	}
}

function init(data){
	//console.log(data)
	filterData = data
		.filter(data => data.Date >= '2020-01-01' && data.Date <= '2020-01-31')
		.sort((data1,data2) => data1.Date > data2.Date ? 1:-1 )
	//console.log(filterData)	

	// 進階篩選
	resultData = filterData.filter(data => data.Option === 'Call'  && data.PriceLevel === 'ATM');
	//console.log(resultData)
	DisplayData(resultData);
}