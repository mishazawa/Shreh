export interface IOnInit {
  onInit(): Promise<any>;
}

export interface IOnDestroy {
  onDestroy(): Promise<any>;
}
