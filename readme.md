## delete-branches
easily delete your branches

<center>
  <img src=https://user-images.githubusercontent.com/2065325/37158469-bd4bcf66-22eb-11e8-993e-bf368229ad11.gif />
</center>

### Installation
```
npm i delete-branches -g
```

### Usage
```
delete-branches
```

#### Use alias
On your `~/.aliases`:

```
alias db=delete-branches
```

#### My `branches` alias
```
alias branches="git for-each-ref --sort='-committerdate:relative' --format=' • %1B[0;32m %(committerdate:relative)%1B[m — %1B[1;30m%(refname:short)%1B[m' refs/heads"
```

#### License
MIT
