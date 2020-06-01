const animate = function(ks) {
  const tl = ks.animate("#All",[{p:'mpath',t:[0,1500],v:['0%','100%'],e:[[1,.2,.5,.5,.9],[0]],mp:"M234.8,407.3L472.3,-134.5"}],
  "#_a0",[{p:'rotate',t:[250,1250,2250,3250,4250],v:[0,4,0,4,0],e:[[1,.4,0,.6,1],[1,.4,0,.6,1],[1,.4,0,.6,1],[1,.4,0,.6,1],[0]]}],
  "#B-Cell",[{p:'rotate',t:[0,2250],v:[-50,0],e:[[1,0,0,.6,1],[0]]}],
  "#_a1",[{p:'mpath',t:[0,1500],v:['0%','100%'],e:[[1,.2,.5,.5,.9],[0]],mp:"M-160.4,899.5L76.3,370.1"},{p:'opacity',t:[1500,2250],v:[0,1],e:[[0],[0]]}],
  {autoremove:false,markers:{"LoopStart":2250}}).range(0,4250);
  if(document.location.search.substr(1).split('&').indexOf('global=paused')>=0)ks.globalPause()

  return tl;
};

module.exports = animate;
