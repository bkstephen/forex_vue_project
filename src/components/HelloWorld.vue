
<template>
  <div style="margin:0px auto;">
    <div>
      <form style="margin: 0px auto; float: none; display: table; text-align:center; " class="form-group">
        <input        
          style="text-align:center; " 
          class="form-control form-control-lg"
          name="cur1"
          id="cur1"
          type="text"
          v-model="currency1"
          @change="init"
        />
        <input
          style="text-align:center; "
          class="form-control form-control-lg"
          name="cur2"
          id="cur2"
          type="text"
          v-model="currency2"
          @change="init"
        />
      </form>      
      <h1>Latest price {{currency1}}/{{currency2}}: {{this.dataset[this.dataset.length-1]}}</h1>
      <div style="margin: 0% auto"><trend :data="this.dataset" :gradient="['#6fa8dc', '#42b983', '#2c3e50']" auto-draw smooth></trend></div>      
      <div style="margin: 0px auto; float: none; display: table; " class="card text-white bg-primary mb-3">
        <p class="card-header" style="font-size:150%">Exchange rate calculator:</p>
        <div class="card-body">
          <form class="form-group">
            <input
              style="width:40%; margin:0px auto; text-align:center;"
              class="form-control form-control-lg"
              name="cur1"
              id="cur1"
              type="text"
              v-model="value"
            />            
          </form>
            <div>
              <p style="font-size:150%">{{(value*this.dataset[this.dataset.length-1]).toFixed(4)}}</p> 
              <label style="font-size:150%">{{currency1}} to {{currency2}}</label><br></br>  
              <button class="btn btn-warning" @click="swap">Switch</button>           
            </div>          
        </div>
      </div>
    </div>
    <footer style="position:relative; bottom:10px;">
      <p>
         Made by Stefanos Bekiaris
        <a href="https://github.com/bkstephen?tab=repositories">GitHub</a>
      </p>
    </footer>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      dataset: [],
      set: [],
      dataset: [],
      currency1: "EUR",
      currency2: "USD",
      value: 1,
      exchange: 0
    };
  },
  methods: {
    swap() {
      let temp = this.currency2;
      this.currency2 = this.currency1;
      this.currency1 = temp;
      this.init();      
    },
    async init() {
      this.dataset = [];
      this.set = [];
      this.dataset = [];
      await axios
        .get(
          "https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=" +
            this.currency1 +
            "&to_symbol=" +
            this.currency2 +
            "&interval=5min&outputsize=full&apikey=BZHR5KHAZN4FI5VL"
        )
        .then(res => {
          const data = res.data["Time Series FX (5min)"];
          for (let key in data) {
            this.dataset.push(parseFloat(data[key]["4. close"]));
          }
          for (
            let i = this.dataset.length - 1;
            i > this.dataset.length - 101;
            i--
          ) {
            this.set.push(this.dataset[i]);
          }
          this.dataset = []
          this.dataset = this.set.reverse();
          //console.log(dataset);
        })
        .catch(err=>{
          console.log(err)
        })
    }
  },
  async mounted() {
    this.init();
  }
};
</script>

